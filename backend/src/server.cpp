#include <cpprest/json.h>
#include <cpprest/http_listener.h>
#include "chemistry.h"

#define PTABLE_FILE_PATH "./PTable.csv"

#define FRONTEND_URL "http://localhost:*"

const utf8string port = "11451";
const utf8string listen_address = "http://localhost:" + port;
const utf8string listen_api_address = listen_address + "/api";

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;


void set_cors_headers(http_response& response) {
    // 设置CORS头部
    response.headers().add(U("Access-Control-Allow-Origin"), U("*"));
    response.headers().add(U("Access-Control-Allow-Methods"), U("GET, POST, OPTIONS"));
    response.headers().add(U("Access-Control-Allow-Headers"), U("Content-Type"));
}
http_response get_response(const status_code status, const utf8string body_data) {
    http_response response;
    response.set_body(json::value(body_data));
    response.set_status_code(status);
    set_cors_headers(response);
    return response;
}
http_response get_response(const status_code status, const web::json::value body_data) {
    http_response response;
    response.set_body(body_data);
    response.set_status_code(status);
    set_cors_headers(response);
    return response;
}
void handle_get(http_request request)
{
    // 创建一个JSON对象作为响应体
    json::value response;
    response[U("message")] = json::value::string(U("Hello from the backend!"));

    // 创建响应对象
    http_response http_response;
    http_response.set_body(response);
    http_response.set_status_code(status_codes::OK);

    // 设置CORS头部
    set_cors_headers(http_response);

    // 发送响应
    request.reply(http_response);
}

PTable ptable;

void handle_post(http_request request)
{
    web::json::value requestBody = request.extract_json().get();
    std::cout << "Receive body: " << std::endl;
    if (requestBody.has_field(U("formula-string")))
    {
        std::string formula = requestBody[U("formula-string")].as_string();
        web::json::value replyJSON, molecules;
        Molecule mole;
        try
        {
            mole.parseFromString(ptable, formula);
        }
        catch (std::exception &e)
        {
            request.reply(get_response(status_codes::OK, U(e.what())) );
            return;
        }
        replyJSON[U("weight")] = mole.getWeight();
        for (auto [elemName, cnt] : mole.getElements(ptable)) {
            json::value mole;
            mole["number"] = cnt;
            mole["id"] = ptable[elemName].eID;
            molecules[elemName] = mole;
        }
        replyJSON[U("elements")] = molecules;
        request.reply(get_response(status_codes::OK, replyJSON));
    }
    else
    {
        request.reply(get_response(status_codes::BadRequest, U("Invalid Data!")));
    }
}

void handle_options(http_request request)
{
    // OPTIONS 请求用于CORS预检，直接返回 200
    http_response response(status_codes::OK);
    set_cors_headers(response);
    request.reply(response);
}

int main()
{
    try
    {
        ptable.importElementTable(PTABLE_FILE_PATH);

        // 创建HTTP监听器
        const utf8string calc_service_address = listen_api_address + "/calc";
        http_listener listenerCalc(calc_service_address);

        // 注册GET和POST请求的处理函数
        listenerCalc.support(methods::GET, handle_get);
        listenerCalc.support(methods::POST, handle_post);

        // 注册OPTIONS请求的处理函数，解决跨域预检问题
        listenerCalc.support(methods::OPTIONS, handle_options);

        // 启动监听器
        listenerCalc.open().wait();

        std::wcout << U("Server started. Use Ctrl+C to stop.") << std::endl;

        // 等待直到按下Ctrl+C
        std::cin.get();
    }
    catch (const std::exception &e)
    {
        std::cerr << e.what() << std::endl;
    }
    return 0;
}