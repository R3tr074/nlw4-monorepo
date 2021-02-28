defmodule RocketpayWeb.UsersViewTest do
  use RocketpayWeb.ConnCase, async: true

  import Phoenix.View

  alias Rocketpay.{Account, User}
  alias RocketpayWeb.UsersView

  test "render create.json" do
    params = %{
      name: "FakeName",
      password: "FakePassword",
      nickname: "FakeNickname",
      email: "Fake@email.com",
      age: 31
    }

    {:ok, %User{id: user_id, account: %Account{id: account_id}} = user} =
      Rocketpay.create_user(params)

    response = render(UsersView, "create.json", user: user)

    expected_response = %{
      message: "User created",
      user: %{
        account: %{balance: Decimal.new("0.00"), id: account_id},
        id: user_id,
        name: "FakeName",
        nickname: "FakeNickname"
      }
    }

    assert response == expected_response
  end
end
