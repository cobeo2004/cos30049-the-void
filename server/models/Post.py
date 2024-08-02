from typing import Optional
from pydantic import BaseModel
from typing_extensions import Annotated, Doc


class Model(BaseModel):
    title: Annotated[str, Doc("""The title of the post""")]
    content: Annotated[Optional[str], Doc("""The content of the doc""")] = ''
    published: Annotated[Optional[bool], Doc(
        """Is the post published ?""")] = False
