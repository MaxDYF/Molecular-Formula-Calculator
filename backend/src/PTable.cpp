#include "PTable.h"
#include <fstream>
#include "GlobalDefs.h"
void PTable::importElementTable(const std::string& address) {
    std::ifstream fin;
    fin.open(address);
    if (!fin.is_open())
        throw std::invalid_argument(FILE_NOT_EXIST_ERROR);

    Element elem;
    char comma;
    while (fin.eof() == false) {
        std::getline(fin, elem.elementName, ',');
        std::getline(fin, elem.shortName, ',');
        fin >> elem.eID >> comma >> elem.weight;
        fin >> std::ws;

        (*this)[elem.elementName] = elem;
        (*this)[elem.shortName] = elem;
        this->tableEID[elem.eID] = elem;
    }
}

Element PTable::getByEID(int16_t eID) {
    return tableEID[eID];
}
