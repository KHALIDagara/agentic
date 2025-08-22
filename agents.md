#Global vars : 
EVOLUTION_API_KEY = "mude-me"
EVOLUTION_URL = "https://whatsapp.elaoudi.org"
## this file is your ultimate guide to create this project ## 
The Goal is To Continue Developing the Current Project following the instructions 
The methology to developing this app is via logging understand .. meaning undersating what is going on just via the Logs .. the Logs must be clear and instructive 

#### available models ####

### instances model ### 
- instance_id ( Primary key and it's a random generated code )
- instance_name (text )
- instance_number (text)
- instance_status { can be pending(default) , closed , open }
- instance_qr_code_64 { qr image encoded as string base64 }
- instance_webhook_url text
## instances Controller ## 
def index
   fetches all the instances data annd the status 
def create_instance 
   -use the function in services/evolution.rb to create an instance from the instance whatsapp number and instance name .. the evlution api server will return the base64 qr code log it in the console and save it to instance_qr_code_base_64 .. log the error and the request sent and received 
   call the setup_Webhook_for_instance function 
   def setup_webhook_for_instance
     - create a new webhook for this specific instance that listens for the instance events on BaseUrl(elaoudi.org)/webhooks/instance_id
     the webhook must always log what it receives in the following format { webhook received !!! instance_id , instance_name , payload data } 
def update_instance_webhook(url) 
    updates the the instance webhook using set webhook endpoint of evolution api 
def delete 
    deletes the instanace 
# instances views # 
components used : instance component , component description : shows the instance name , instance Phone number , and the status ( green dot if status is open and other color if other status ) . + edit button to edit the webhook url 
pages : 
  index page : "shows all the instances components and get updates in real time " condition # updates must be in real time 
  create page : " form for the user to fill the instance name + instance whatsapp number "
  show page : show the qr code for the user to scan it once the webhook receives a successful qr code scan update or successful status update to open it redirect the user to the index page 
### contacts model ###
- contact_id ( Primary key and it's a random generated code )
- contact_name (string)
- contact_whatsapp_number text 
- contact_description (text)
- contact_country (text)
- contact_tags [] 
- contact_llm_context ( jsonb)
## contacts Controller ## 
def index :
    show all the contacts and get updates in real time 
def create : 
     create a new contact the required info are contact_whatsapp_number 
def assign_tag: 
    assign a new tag to a contact 
def search_by_tags(tags [] ):
    takes the tags as argument and it searches for all the contacts that have the same tags 
    finally it returns 
    the list of contacts ids 
    and the count 
def delete contact( contact ):
    destroy the contact 
def add_new_entry_to_llm_context( contact , json ): 
   appends the existing json with the new json 
def replace_llm_context ( contact ,json ): 
   replaces the exisitng json with the new json 
other functions we will need 
def search_by_name( string ) 
    returns the contacts 
def search_by_whatsapp_number( text ) 
 return the contacts 
def search_by_country ( text ) 
 return the contacts 
# contacts views # 
compoents must be used : contact component shows contact name , contact whatsapp number , whatsapp  button to start a conversation with the contact 
index view : shows all the contact and can be filters by the tags in real time and also it shows the count of contacts in a specfic tag in real time and can be filterd by country , name , business description and whatsapp phone number , bulk select option is enabled !! 
add new contact  view : user can add  new contact and fill all the information
users can delete contacts
users can modify any contact and update it's informations
### conversations model ###
- conversation_id ( primary key and it's a random generated code )
- conversation_instance_id ( foreign key of instance model )
- conversation_instance_name ( same entity instance_id )
- conversation_contact_id (foriegn key of contact model )
- conversation_contact_name (same entity contact_id )
- conversation_last_message_content (text )
- conversation_last_maessage_timestamp ( date )
## conversations controller ## 
- get_user_instances
- create  a conversation action ( contact , instance ):
    search for the conversations that has contact the recieved contact and the instance is the received instance
    if found return the data about the conversations
    if not found create..  new conversation for the last message is the last message between the contact and instance and the timestamp is the timestamp of the last message 
- list all the conversation action
- retrieve_conversation_history returns the history   of a given conversation between the contact and the instance ..including identifying the type of the message and reformlating data for the UI
- conversation_append_tag( conversation , new_tag string ):
-    the contact IN THE CURRENT CONVERSATION .. if other conversation is selected the contact of the newly selected conversation
- conversation_remove_tag( conversation , tag_to_remove string):
-   remove the tag from the tags of  the contact IN THE CURRENT CONVERSATION .. if other conversation is selected the contact of the newly selected conversation
- retreive_conversation_tags( conversation ): retreive tags of the contact IN THE CURRENT CONVERSATION .. if other conversation is selected the contact of the newly selected conversation
# conversations views #
all of these elemnents must implement HOTWIRE or any other ruby on rails  8 feature that will allow real time updates .. Receving messages and updating the UI isntantly whenever a message is sent or recieves or conversations created / deleted , last message of any conversation is updated .. the changes must Appear in The Ui instantly 
Implement infinite scrolling for the panes 
the conversations page has two panels use a conversations layout
the first layout is on the left  and it lists all the conversations once a conversation is clicked ( it shows a right pane for the message history separating the messages that are from me and that are not and show the latest messages first the scrolling must start from the latest messages .. each message has a timestamp 
the input text and attachement button and send button act as the sending message functionlity the message is routed to the appropriate action based on the type of the message
The final one is switching the instances in case multiple instances exist .. the only change will happen when switching instances .. you can switch the source of the input message from The default instance to the chosen instance 
### messages model ### 
-message_id ( primary key and it's a random genrated code ) 
-message_conversation_id ( foreign key of conversations model ) 
-message_type enum ( can be audio , text , video , document , image ) 
-message_from_me ( if it's a message sent from the webhook and it's fromMe = false , or if the usr is the one sending the message fromMe then is true ) 
-message_timestamp ( date default to now ) 
-message_conent text ( if it's text it's the text of the message if it's a media it's base64 encoding of the media ) 
## messages controllers ## 
- index action that retreives history starting from the latest messages 
### campaigns model ### 
-campaign_id ( primary key and it's a random generated code ) 
-campaign_name text 
-campaign_target_tags [] 
-campaign_contact_count int
-campaign_status enum (can be pending , in_progress ,paused , completed ) 
_campaign_sent int 
_campaign_failed int 
-campaign_responding_agent (foriegn key to agent ) 
-campaign_starting_campaign_message (foriegn key to campaign_messages ) 
### campaign_messages model ### 
-campaign_message_id ( primary key and it's a random generated code ) 
-campaign_message_content text
-campaign_message_attachement_base64 text
_campaign_message_timestamp 
_campaign_message_status enum and can be failed , sent , pending 
### agents model ###
-agent_id ( primary key and it's a random generated code )
-agent_name text
-agent_system_context text
-agent_memory jsonb
-agent_assigned_tags [] 
-agent_instance_id ( foriegn key to instance ) 

