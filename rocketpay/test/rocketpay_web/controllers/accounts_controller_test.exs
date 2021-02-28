defmodule RocketpayWeb.AccountsControllerTest do
  use RocketpayWeb.ConnCase, async: true

  alias Rocketpay.{Account, User}

  describe "deposit/2" do
    setup %{conn: conn} do
      params = %{
        name: "FakeName",
        password: "FakePassword",
        nickname: "FakeNickname",
        email: "Fake@email.com",
        age: 31
      }

      {:ok, %User{account: %Account{id: account_id}}} = Rocketpay.create_user(params)

      encoded_auth_basic = Base.encode64("banana:nanica123")

      conn = put_req_header(conn, "authorization", "Basic #{encoded_auth_basic}")

      {:ok, conn: conn, account_id: account_id}
    end

    test "when all params are valid, make the deposit", %{conn: conn, account_id: account_id} do
      params = %{"value" => "50.00"}

      response =
        conn
        |> post(Routes.accounts_path(conn, :deposit, account_id, params))
        |> json_response(:ok)

      expected_response = %{
        "account" => %{"balance" => "50.00", "id" => account_id},
        "message" => "Ballance changed Successfully"
      }

      assert response == expected_response
    end

    test "when there are invalid params, returns an error", %{conn: conn, account_id: account_id} do
      params = %{"value" => "banana"}

      response =
        conn
        |> post(Routes.accounts_path(conn, :deposit, account_id, params))
        |> json_response(:bad_request)

      expected_response = %{"message" => "Invalid value!"}

      assert response == expected_response
    end
  end

  describe "withdraw/2" do
    setup %{conn: conn} do
      params = %{
        name: "FakeName",
        password: "FakePassword",
        nickname: "FakeNickname",
        email: "Fake@email.com",
        age: 31
      }

      {:ok, %User{account: %Account{id: account_id}}} = Rocketpay.create_user(params)

      Rocketpay.deposit_value(%{"id" => account_id, "value" => "500.00"})

      encoded_auth_basic = Base.encode64("banana:nanica123")

      conn = put_req_header(conn, "authorization", "Basic #{encoded_auth_basic}")

      {:ok, conn: conn, account_id: account_id}
    end

    test "when all params are valid, make the withdraw", %{conn: conn, account_id: account_id} do
      params = %{"value" => "50.00"}

      response =
        conn
        |> post(Routes.accounts_path(conn, :withdraw, account_id, params))
        |> json_response(:ok)

      expected_response = %{
        "account" => %{"balance" => "450.00", "id" => account_id},
        "message" => "Ballance changed Successfully"
      }

      assert response == expected_response
    end

    test "when there are invalid params, returns an error", %{conn: conn, account_id: account_id} do
      params = %{"value" => "banana"}

      response =
        conn
        |> post(Routes.accounts_path(conn, :deposit, account_id, params))
        |> json_response(:bad_request)

      expected_response = %{"message" => "Invalid value!"}

      assert response == expected_response
    end
  end
end
