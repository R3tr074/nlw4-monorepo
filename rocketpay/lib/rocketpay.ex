defmodule Rocketpay do
  alias Rocketpay.Users.Create, as: UserCreate

  alias Rocketpay.Accounts.{Deposit, Transaction, Withdraw}

  defdelegate create_user(params), to: UserCreate, as: :call

  defdelegate deposit_value(params), to: Deposit, as: :call
  defdelegate withdraw_value(params), to: Withdraw, as: :call
  defdelegate transaction(params), to: Transaction, as: :call
end
