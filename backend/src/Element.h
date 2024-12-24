//
// Created by MaxDYF on 24-12-12.
//

#ifndef ELEMENT_H
#define ELEMENT_H
#include <string>

#include <cstdint> // 包含int16_t的定义

class Element {
public:
    std::string elementName; // 元素的名称
    std::string shortName;   // 元素简称
    int16_t eID;             // 原子序数
    float weight;            // 原子量

    // 构造函数声明
    Element();
    Element(std::string elementName, std::string shortName, int16_t eID, float weight);
};

#endif //ELEMENT_H
