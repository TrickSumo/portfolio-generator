# -*- coding: utf-8 -*-
"""
Created on Tue May 17 20:31:39 2022

@author: Rishi
"""
    # This lambda function will detecet file changes and create invalidations for both react and html folder

import json
import boto3
import urllib.parse
import time


cf=boto3.client('cloudfront')
user_data_dist_id = 'cdn-id-of-html-files'
build_dist_id = 'cdn-of-react'


def lambda_handler(event, context): 
    # TODO implement
    
    response=""  
    
    def invalidate_user_data(path):  
        
        try:
                   
            response = cf.create_invalidation(
            DistributionId= user_data_dist_id  ,
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
            
            
    
    def invalidate_build_file(path):
        
        
        try:
            
            
            response = cf.create_invalidation(
            DistributionId=  build_dist_id  ,
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
            
            
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    folder = key.split('/')[0]
    print(folder)
    
    if (folder=='user-data'):
        path = "/"+key.split('/')[1]
        print(path)
        invalidate_user_data(path)
        
    if (folder=='build'):
        path = "/"+key.split('/')[2]
        print(path)
        invalidate_build_file(path)
        
    
    
    print(key)
