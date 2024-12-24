#ifndef PTABLE_H
#define PTABLE_H

#include "GlobalDefs.h"
#include <unordered_map>
#include <array>
#include <string>
#include "Element.h"


class PTable : public std::unordered_map<std::string, Element> {
private:
    std::array<Element, KNOWN_ELEMENT + 1> tableEID;

public:
    void importElementTable(const std::string& address);
    Element getByEID(int16_t eID);
};

#endif // PTABLE_H
