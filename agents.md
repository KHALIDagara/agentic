## this file is your ultimate guide to create this project ## 
#### available models ####
### instances model ### 
- instance_id ( Primary key and it's a random generated code )
- instance_name (text )
- instance_number (text)
- instance_status { can be pending(default) , closed , open }
- instance_qr_code_64 { qr image encoded as string base64 }
### contacts model ###
- contact_id ( Primary key and it's a random generated code )
- contact_name (string)
- contact_description (text)
- contact_country (text)
- contact_llm_context ( jsonb)
### conversations model ###
- conversations_id ( primary key and it's a random generated code )
- instance_id ( foreign key of instance model )
- instance_name ( same entity instance_id )
- contact_id (foriegn key of contact model )
- contact_name (same entity contact_id )
- last_message_content (text )
- last_maessage_timestamp ( date )
- 
