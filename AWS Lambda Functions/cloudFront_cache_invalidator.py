# -*- coding: utf-8 -*-
"""
Created on Tue May 17 20:31:39 2022

@author: Rishi
"""

import json
import boto3
import urllib.parse
import time


   

cf=boto3.client('cloudfront')
dist_id = 'E15RZDX35Q5QHZ'

def lambda_handler(event, context):
    
    # TODO implement
    
    #bucket = event['Records'][0]['s3']['bucket']['name']
    
    
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    path = "/"+key.split('/')[1]
    print(path)
    response=""
    
    
    def invalidate():
        
        
        try:
            
            
            response = cf.create_invalidation(
            DistributionId= 'E15RZDX35Q5QHZ'   ,
            InvalidationBatch={
                'Paths': {
                    'Quantity': 1,
                    'Items': [
                        path
                    ]
                },
                'CallerReference': str(time.time()).replace(".", "")
                 }
              )
        
            #invalidation_id = response['Invalidation']['Id']
            print("Done")
      

        except e:
            print("error",e)
    
    
    invalidate()
   

        
    
    
    

    
