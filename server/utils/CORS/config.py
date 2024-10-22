from dataclasses import dataclass, field


@dataclass
class CORSConfig:
    ORIGINS: list[str] = field(default_factory=lambda: ["http://localhost:3000"])
    ALLOW_CREDENTIALS: bool = True
    ALLOW_METHODS: list[str] = field(
        default_factory=lambda: ["GET", "POST", "PUT", "DELETE"]
    )
    ALLOW_HEADERS: list[str] = field(default_factory=lambda: ["*"])


cors_config = CORSConfig()
