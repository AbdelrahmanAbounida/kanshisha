from pydantic import BaseModel
from typing import TypeVar
from uuid import UUID

ID = TypeVar(UUID, int, str,)


class BaseAPIModel(BaseModel):

    def json():
        pass 

    def dict(self):
        pass 

    class Config:
        """TODO:: add more configurations """