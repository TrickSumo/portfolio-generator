import json
import boto3
import hashlib
from boto3.dynamodb.conditions import Key
table_name = "profile_records"

dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
table = dynamodb.Table(table_name)

    
    

def lambda_handler(event, context):
    
    data=json.loads(event['body'])
    profileTag = data['profileTag']
    email=data['email']
    hash = (hashlib.md5(email.encode())).hexdigest()
    print(hash)
    
    
    response = table.get_item(
    Key={
        'email_hash': hash,
       
        }
       )
       
    initial_data= response['Item'][profileTag]
    print(initial_data)
    
    if profileTag in response['Item']['profileTag']:
        
        
        return {
        'statusCode': 200,
        'body': initial_data
     }
     
    
    return {
        'statusCode': 200,
        'body': json.dumps('Someting Went Wrong!!!')
    }
