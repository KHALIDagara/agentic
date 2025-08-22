## this file is your ultimate guide to create this project ## 
#### available models ####

### instances model ### 
- instance_id ( Primary key and it's a random generated code )
- instance_name (text )
- instance_number (text)
- instance_status { can be pending(default) , closed , open }
- instance_qr_code_64 { qr image encoded as string base64 }
- instance_webhook_url text
### contacts model ###
- contact_id ( Primary key and it's a random generated code )
- contact_name (string)
- contact_description (text)
- contact_country (text)
- contact_llm_context ( jsonb)
### conversations model ###
- conversation_id ( primary key and it's a random generated code )
- conversation_instance_id ( foreign key of instance model )
- conversation_instance_name ( same entity instance_id )
- conversation_contact_id (foriegn key of contact model )
- conversation_contact_name (same entity contact_id )
- conversation_last_message_content (text )
- conversation_last_maessage_timestamp ( date )
### messages model ### 
-message_id ( primary key and it's a random genrated code ) 
-message_conversation_id ( foreign key of conversations model ) 
-message_type enum ( can be audio , text , video , document , image ) 
-message_timestamp ( date default to now ) 
-message_conent text ( if it's text it's the text of the message if it's a media it's base64 encoding of the media ) 
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

