from dataclasses import dataclass


@dataclass
class Price:
    amount: float
    currency: str

    # def __int__(self, amount: float, currency: str):
    #     self.amount: float = amount,
    #     self.currency: str = currency

