//
// Created by MaxDYF on 24-12-12.
//

#include "Element.h"
#include <string>
// 默认构造函数实现
Element::Element()
    : elementName(""), shortName(""), eID(0), weight(0) {}

// 带参数的构造函数实现
Element::Element(std::string elementName, std::string shortName, int16_t eID, float weight)
    : elementName(elementName), shortName(shortName), eID(eID), weight(weight) {}
