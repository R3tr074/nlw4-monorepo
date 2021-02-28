defmodule RocketpayWeb.UsersView do
  use RocketpayWeb, :view

  alias Rocketpay.{Account, User}

  def render(
        "create.json",
        %{
          user: %User{
            id: id,
            name: name,
            nickname: nickname,
            account: %Account{
              id: account_id,
              balance: balance
            }
          }
        }
      ) do
    %{
      message: "User created",
      user: %{
        id: id,
        name: name,
        nickname: nickname,
        account: %{
          id: account_id,
          balance: balance
        }
      }
    }
  end
end
