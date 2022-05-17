# -*- coding: utf-8 -*-
"""
Created on Tue May 17 20:35:30 2022

@author: Rishi
"""

import json
import boto3
from boto3.dynamodb.conditions import Key

s3 = boto3.client('s3')


bucket = 'portfolio-generator-user-data-v2'
table = dynamodb.Table('profile_records')


def lambda_handler(event, context):

    data=json.loads(event['body'])
    
    
    name = data['name']
    hash = data['email']
    thumbnailURL = data['thumbnailURL']
    location = data['location']
    edu=data['edu']
    exp=data['exp']
    hob=data['hob']
    profileTag=data['profileTag']
    print(profileTag)
    #print(name)
    
    with open("/tmp/"+hash+profileTag+".html",'w+') as file:
        file.write('')
               
    with open("/tmp/"+hash+profileTag+".html",'a+') as file:
        file.write('''<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <!-- <link rel="stylesheet" href="style.css"> -->
        <script src="https://portfolio.tricksumo.com/index.js" defer> </script>
    
        <title>{}</title>
        
         <link rel="icon" type="image/x-icon" href="https://portfolio.tricksumo.com/favicon.png">
    </head>
    
    '''.format(name)
    
    + ''' <body id = "body">
    
        <header>
            <a href="{}{}.html" id="logo">My Portfolio</a>
            <button id="btn"> Dark Theme</button>
        </header>'''.format(hash, profileTag)
        
        +
        
        '''    <section>
    
    
    
           <center>
               <figure> 
                   <img src="{}" alt="A4 photo of candidate" height="300" id="photo"> 
                   <figcaption id="figcaption"> <u> {} </u> <br/> <u> {} </u> </figcaption>
                </figure>
            
            </center>
    
        </section>'''.format(thumbnailURL, name,location)
        
        
        +
        
        '''
        <section id="card">
        <section id="card1">
    
       <center>  <b> Education!</b> </center>
       <ul>'''
       )
       
    
        for i in edu:
            file.write("<li>{}</li> <br/>".format(i['text']))
        
        file.write('''
                  </ul>
     
         </section>
    
         <section class="card2">
    
            <center>  <b> Experience!</b> </center>
    
            <ul>''')
            
        for i in exp:
            file.write("<li>{}</li> <br/>".format(i['text']))
            
        file.write('''
                  </ul>
     
         </section>
    
         <section id="card3">
    
            <center>  <b> Hobbies!</b> </center>
    
            <ul>''')
            
        for i in hob:
            file.write("<li>{}</li> <br/>".format(i['text']))
            
        file.write('''
                      </ul>
         
             </section>
             </section>
    
                  <footer id="footer">
    
            All &copy are owned by {}.
    
    
         </footer>
    
    
        
        </body>
        </html>'''.format(name))
        
        print("made file")
        
    
    try:
        
        # File Upload
        localFile = "/tmp/"+hash+profileTag+".html"
        path="user-data/"
        fileName = hash+profileTag+".html"
        s3.upload_file(localFile, Bucket=bucket, Key=path+fileName, ExtraArgs={'ContentType':'text/html'})
        print('Put Complete')
        
        
        
        
    except:
        
        print("Something Went Wrong")
        
        return {'statusCode': 500,
        
        'body':"Something Went Wrong"
            }
            
    
    # Dynamodb Table Fetchin Existing Data
    
    try:
       
        
        
        dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
        
        data=[]
        data1 = table.get_item( Key={'email_hash':hash})['Item']
        data = data1['profileTag']
        print(data)
        

    except KeyError:
        print("key not found")
        print(table.put_item( Item = {'email_hash':hash}  ))
        
        
    # Dynamodb Update profileTag Attribute
    
    try:
        
        data.append(profileTag)
        data = list(set(data))
        
        table.update_item(   Key={ 'email_hash':hash},  UpdateExpression = 'SET profileTag = :data', ExpressionAttributeValues = {':data':data} )
        
        print(f'added attributes {data}')
       
    except:
        
        print("Something Went Wrong During Dynamodb Update Operation")
        
        return {'statusCode': 500,
        
        'body':"Something Went Wrong"
            }
        
        
        

    
    
    return {
        'statusCode': 200,
        
        'body': "Successfully uploaded to bucket!!!"
        
        
        }


