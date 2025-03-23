"""
Base class for all Resources that handle the base crud operations 
"""
from typing import TYPE_CHECKING,  Generic
from typing import cast 
from abc import ABC ,abstractmethod


if TYPE_CHECKING:
    from moraqib._client import Moraqib, AsyncMoraqib
    from moraqib.types import Type,GetType, ListType, PostType, PutType, DeleteType,APIResponse


class Resource(Generic[Type,GetType, ListType, PostType, PutType, DeleteType ], ABC):
    """Base class for all api Resources that handle the base crud operations"""
    _client: Moraqib

    def __init__(self, client:Moraqib,endpoint :str) -> None:
        self._client = client[APIResponse] 
        self.endpoint = endpoint

    @abstractmethod 
    def get_endpoint(self):
        return self.endpoint
    
    
    def create(self,body:PostType,**kwargs) -> Type:
        res = self._client.post(
           self.endpoint,
           body=body,
           **kwargs
        )
        res.raise_for_status()
        return Type(**res.json())

    def get(self, id:str, **kwargs) -> Type:
        res = self._client.get(
            f"{self.endpoint}{id}",
            **kwargs
        )
        res.raise_for_status()
        return Type(**res.json())
        
    def list(self,*args,**kwargs) -> list[Type]:
        res = self._client.list(
            self.endpoint,
            *args,
            **kwargs,
        )
        res.raise_for_status()
        return [Type(**item) for item in res.json()]

    # TODO:: add more crud operations 
    

class AsyncResource:
    _client: AsyncMoraqib 

    def __init__(self, client: AsyncMoraqib) -> None:
        self._client = client