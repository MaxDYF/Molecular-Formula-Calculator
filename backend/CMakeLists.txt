cmake_minimum_required (VERSION 3.0)
project (Molecular_Formula_Calculator)

# 查找当前目录下的所有源文件
# 并将名称保存到 DIR_SRCS 变量
SET(CMAKE_CXX_STANDARD 20)
file(GLOB_RECURSE DIR_SRCS "./src/*.cpp")

find_package(cpprestsdk REQUIRED)
find_package(OpenSSL REQUIRED)

# 指定生成目标
add_executable(MFCalc ${DIR_SRCS}
        src/PTable.cpp
        src/PTable.h
        src/Element.cpp
        src/Element.h
        src/Molecule.cpp
        src/Molecule.h
        src/GlobalDefs.h
)

# 链接cpprestsdk库和OpenSSL库到目标MFCalc
target_link_libraries(MFCalc PRIVATE cpprestsdk::cpprest OpenSSL::SSL OpenSSL::Crypto)