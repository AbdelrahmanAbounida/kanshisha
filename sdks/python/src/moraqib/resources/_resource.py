"""
Base class for all Resources that handle the base crud operations 
"""
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from moraqib._client import Moraqib, AsyncMoraqib


class Resource:
    _client: Moraqib

    def __init__(self, client:Moraqib) -> None:
        self._client = client 
    

class AsyncResource:
    _client: AsyncMoraqib 

    def __init__(self, client: AsyncMoraqib) -> None:
        self._client = client