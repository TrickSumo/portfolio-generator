# -*- coding: utf-8 -*-
"""
Created on Tue May 17 20:33:39 2022

@author: Rishi
"""

import json
import boto3
from botocore.exceptions import ClientError
import random

s3 = boto3.client('s3')

bucket = 'portfolio-generator-user-data-v2'


def lambda_handler(event, context):
       
    data=json.loads(event['body'])
    hash=data['hash']
    profileTag = data['profileTag']
    
    print(hash)
    print(profileTag)
    
    key = 'user-data/'+hash+profileTag+'.jpeg'
    
    


    try:
        s3Params =  {'Bucket':bucket, 'Key':key, 'ContentType':'image/png'}
        res = s3.generate_presigned_url('put_object', s3Params, ExpiresIn=300, HttpMethod='PUT')
        return  {
                
                
                'statusCode': 200,
                'body': res
            }
   

    except ClientError as e:
        print(e)
        return {
                
                
                'statusCode': 500,
                'body': "error"
            }
        
    return {
        
        
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
