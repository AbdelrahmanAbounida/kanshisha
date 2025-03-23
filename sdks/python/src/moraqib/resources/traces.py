from ._resource import Resource, AsyncResource
from moraqib._client import Moraqib

class Trace(Resource):
    """
    Trace is a resource that handles trace operations
    """
    endpoint = "/traces/"
    def __init__(self, client: Moraqib):
        super().__init__(client) 

        
    def create(self,*args,**kwargs):
        return self._client.post(
           self.endpoint,

        )
    
    def list(self,*args,**kwargs):
        return self._client.list(
            self.endpoint,
            *args,
            **kwargs,
        )

class AsyncTrace(AsyncResource):
    pass 