from pydantic import BaseModel
from typing import TypeVar
from uuid import UUID

ID = TypeVar(UUID, int, str,)


class APIResponse(BaseModel):

    def json():
        pass 

    def dict(self):
        pass 

    class Config:
        """TODO:: add more configurations """


Type = TypeVar("Type", bound=APIResponse)
GetType = TypeVar("GetType", bound=APIResponse)
ListType = TypeVar("ListType", bound=APIResponse)
PostType = TypeVar("PostType", bound=APIResponse)
PutType = TypeVar("PutType", bound=APIResponse)
DeleteType = TypeVar("DeleteType", bound=APIResponse)