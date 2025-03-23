from moraqib._exceptions import MoraqibError 
from moraqib.resources.traces import Trace
from typing import Optional, Mapping , Any,TypeVar,Generic
import httpx 
from httpx import Response
import os

Body = TypeVar("Body", Mapping[str, Any],None)
T = TypeVar("T",None)

class Moraqib(Generic[T]):
    """
    Moraqib is a Python class for managing a Moraqib's inventory.
    """
    ## TODO:: extract 

    traces: Trace
    def __init__(self,
                 base_url:Optional[str] | httpx.URL=None,
                 *,
                 api_key:str,
                 http_client: httpx.Client=None,
                 ) -> None:
        if not base_url:
            self.base_url = "http://localhost:5000/api/v1"
        else:
            self.base_url = base_url

        self.api_key = api_key
        if not self.api_key:
            self.api_key = os.environ.get('MORAQIB_API_KEY')
        
        if not self.api_key:
            raise MoraqibError("Moraqib API key is not provided. Please provide it as a parameter or set the environment variable 'MORAQIB_API_KEY'")
        
        self.http_client = http_client or httpx.Client(
            base_url=self.base_url,
            auth=(self.api_key, ''),
            headers=self._headers,
            # limits= ## TODO:: handle limits 
        )

        # Main Resources 
        self.traces = Trace(self)

    @property
    def _headers(self):
        return {
            # 'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }


    def get(self, 
            path:str,
            *,
            stream:bool=False
            ) -> Response:
        return self.http_client.get(path,headers=self._headers,stream=stream) # TODO:: handle custom  stream Response 

    def post(self,
            path:str,
            *,
            body: Optional[Body],
            stream:bool=False
            ) -> Response:
        # TODO:: use generics to handle cast operation 
        return self.http_client.post(path,headers=self._headers,data=body,stream=stream) # TODO:: handle custom  stream Response 

    def list(self,
            path:str,   
             *,
            stream:bool=False
             ) -> Response :
        """TODO:: paginated response"""
        return self.http_client.get(path,headers=self._headers,stream=stream) # TODO:: handle custom  stream Response 
         
    
    def put(self):
        pass 

    def patch(self):
        pass 

    def delete(self):
        pass 



class AsyncMoraqib():
    """
        TODO:: add support for async httpx
    """