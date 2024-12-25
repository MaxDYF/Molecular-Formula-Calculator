#include "Molecule.h"
#include "PTable.h"
#include "GlobalDefs.h"
#include <stack>
#include <stdexcept>
Molecule::Molecule() : totWeight(0) {
	// 构造函数实现
}

Molecule::~Molecule() {
	elems.clear();
	totWeight = 0;
}

void Molecule::join(const Element& obj) {
	this->totWeight += obj.weight;
	this->elems[obj.eID]++;
}

void Molecule::join(const Molecule& obj) {
	for (auto& [key, value] : obj.elems)
		this->elems[key] += value;
	this->totWeight += obj.totWeight;
}

float Molecule::getWeight() {
	return totWeight;
}

void Molecule::multiply(int mul) {
	for (auto& [key, value] : elems)
		value *= mul;
	totWeight *= mul;
}

void Molecule::parseFromString(PTable &table, std::string_view str) {
	// 从字符串获取原子量
	struct MoleStackElem {
		// 定义一个特殊的栈内元素，用于区分括号和分子
		Molecule mole;
		bool isBracket;
		MoleStackElem() {
			isBracket = true;
		}
		MoleStackElem(const Molecule obj) : mole(obj), isBracket(false) {}
	};
	std::stack<MoleStackElem> moleStack;
	for (int i = 0; i < str.length(); i++)
	{
		if (std::isupper(str[i]))
		{
			std::string word;
			word.push_back(str[i++]);
			while (i < str.length() && std::islower(str[i]))
				word.push_back(str[i++]);
			i--;
			auto it = table.find(word);
			if (it == table.end()) // 找不到对应元素，字符串有误
				throw std::invalid_argument(ILLEGAL_STRING_ERROR);
			auto elem = (*it).second;
			Molecule newMole;
			newMole.join(elem);
			moleStack.emplace(MoleStackElem(newMole));
		}
		else if (std::isdigit(str[i]))
		{
			int mul = 0;
			while (i < str.length() && std::isdigit(str[i]))
				mul = (mul * 10) + str[i++] - '0';
			i--;
			if (moleStack.empty() || moleStack.top().isBracket == true)
				throw std::invalid_argument(ILLEGAL_STRING_ERROR);
			moleStack.top().mole.multiply(mul);
		}
		else if (str[i] == '(')
			moleStack.emplace(MoleStackElem());
		else if (str[i] == ')')
		{
			Molecule mole;
			while (moleStack.empty() == false && moleStack.top().isBracket == false)
			{
				mole.join(moleStack.top().mole);
				moleStack.pop();
			}
			if (moleStack.empty())
				throw std::invalid_argument(ILLEGAL_STRING_ERROR);
			moleStack.pop();
			moleStack.emplace(MoleStackElem(mole));
		}
		else
			throw std::invalid_argument(ILLEGAL_STRING_ERROR);
	}
	while (moleStack.empty() == false) {
		if (moleStack.top().isBracket == true)
			throw std::invalid_argument(ILLEGAL_STRING_ERROR);
		(*this).join(moleStack.top().mole);
		moleStack.pop();
	}
}
std::unordered_map<std::string, int> Molecule::getElements(PTable &table) {
	std::unordered_map<std::string, int> s;
	for (auto& [eID, cnt] : elems) {
		s[table.getByEID(eID).elementName] = cnt;
	}
	return s;
}