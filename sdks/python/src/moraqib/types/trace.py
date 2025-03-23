# TODO:: see how to auto generate using openapi spces 
from typing import Optional
from moraqib.types.common import ID, BaseAPIModel
from pydantic import Field
import datetime

class Trace(BaseAPIModel):
    name: Optional[str]
    """The name of the trace"""
    latency: Optional[float]
    """The latency of the trace"""
    tota_cost: float 
    """cost of trace in USD """
    observations: list[ID]
    """The List of observations' ids of the trace"""
    scores: list[float]
    """The list of scores of the trace"""
    timestamp: datetime.datetime 
    """The timestamp of the trace"""    
    session_id: ID 
    """The session id of the trace"""
    user_id: ID 
    """The user id of the trace"""
    project_id: ID 
    """The project id of the trace"""
    is_public: Optional[bool] = Field(type=bool, default=False)
    """Whether the trace is public"""
    tags: list[str] = []
    """The list of tags of the trace"""


class CreateTrace(BaseAPIModel):
    name: Optional[str]
    used_id: Optional[str]
    session_id: Optional[str]
    tags: list[str] = []
    public: Optional[bool] = Field(type=bool, default=False)

# TODO:: add more traces CRUD class bodies 