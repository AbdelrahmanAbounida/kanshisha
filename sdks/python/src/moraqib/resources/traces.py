from ._resource import Resource, AsyncResource
from moraqib._client import Moraqib
from moraqib.types import TraceBody, CreateTrace, UpdateTrace, DeleteTrace

class Trace(Resource[TraceBody, CreateTrace, UpdateTrace, DeleteTrace]):
    """
    Trace is a resource that handles trace operations
    """
    endpoint = "/traces/"
    def __init__(self, client: Moraqib):
        super().__init__(client, self.endpoint) 
        
    def get_endpoint(self):
        return self.endpoint
    
    # TODO:: add more custom methods for tracing 
    
class AsyncTrace(AsyncResource):
    pass 