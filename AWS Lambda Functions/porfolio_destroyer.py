# -*- coding: utf-8 -*-
"""
Created on Tue May 17 20:30:52 2022

@author: Rishi
"""

import json
import boto3
import hashlib

from boto3.dynamodb.conditions import Key

s3=boto3.client('s3')
bucket = 'portfolio-generator-user-data-v2'


def file_destroyer(data, hash):
    
    profileTag = data['profileTag']
    
    
    
    try:
        
        path="user-data/"
        fileName = hash+profileTag+".html"
        fileName2 = hash+profileTag+".jpeg"
        
        s3.delete_object(Bucket=bucket, Key=path+fileName)
        s3.delete_object(Bucket=bucket, Key=path+fileName2)
        
        print("removed files from bucket")
        
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table = dynamodb.Table('profile_records')
        data=[]
        data1 = table.get_item( Key={'email_hash':hash})['Item']
        data = data1['profileTag']
        
        print("got data from  dynamodb")
        
        
        data.remove(profileTag)
        
        
        print("removing tag from dynamodb")

        table.update_item(Key={ 'email_hash':hash},

        UpdateExpression = 'SET profileTag = :data',
    
        ExpressionAttributeValues = {':data':data}


        )
        
        print("Successfully removed tag from dynamodb!!!")
        
        
        
    except:
        
        print("error occured")
        
        return {
        'statusCode': 500,
        'body': json.dumps("failed to delete_object")
         }

    
    return {
        'statusCode': 200,
        'body': json.dumps("Deleted Object Sucessfully")
            }
            

def fetcher(hash):
    
    
    
    print("hi fetcher"+ hash)
    
    try:
        
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        table = dynamodb.Table('profile_records')
        data=[]
        data1 = table.get_item( Key={'email_hash':hash})['Item']
        data = data1['profileTag']
        print(data)
        

    except KeyError:
        print("key not found")
        data = []
    
    return {
        'statusCode': 200,
        'body': json.dumps(data)
            }
    
    

def lambda_handler(event, context):
    
    data = json.loads(event['body'])
    print(data)
    
    email = data['email']
    hash = (hashlib.md5(email.encode())).hexdigest()
    print(hash)
    
    if len(data) == 2:
        return file_destroyer(data, hash)
    else:
        return fetcher(hash)
        
    return {
        'statusCode': 200,
        'body': json.dumps("not called any function")
            }
