# -*- coding: utf-8 -*-
# @Author: edward
# @Date:   2018-04-21 10:50:37
# @Last Modified by:   edward
# @Last Modified time: 2018-04-21 15:38:37

products = [
    {"name": "肉1", "cost": 20},
    {"name": "肉2", "cost": 19},
    {"name": "肉3", "cost": 18},
    {"name": "蔬菜1", "cost": 11},
    {"name": "蔬菜2", "cost": 10},
    {"name": "蔬菜3", "cost": 8},
    {"name": "面包1", "cost": 6},
    {"name": "面包2", "cost": 5},
    {"name": "面包3", "cost": 2},
]

class Discount(object):
    def __init__(self, products, profit_rate):
        self.products = products
        self.profit_rate = profit_rate

    def get_discount_price(self):
        pass

    def get_unit_price(self, cost, profit_rate=None):
        if profit_rate is None:
            profit_rate = self.profit_rate
        return round(cost / (1 - profit_rate), 1)

    def get_total_price(self):
        '''
        基本公式:
            单价 = 成本 + 毛利
            毛利率 = 总毛利/营业收入
                  = E(单价 - 成本) / E单价
                  = (E(单价) - E(成本)) / E单价
                  = 1 - E(成本)/E(单价)
        推导出公式:
            E(单价) = E(成本)/(1 - 毛利率)
            只考虑任意多个菜品的成本总数之和, 并且保证达到期望的毛利率(如50%)
        '''
        unit_prices = [self.get_unit_price(p["cost"]) for p in self.products]
        return unit_prices

    def get_discount_rules(self, lower_profit_rate, profit_gross):
        """
        on basis of ensurance of profit gross
        """
        for p in self.products:
            unit = self.get_unit_price(p["cost"], lower_profit_rate)
            unit - p["cost"]
            print unit, unit - p["cost"]
        # return [self.get_unit_price(p["cost"], 0.45) for p in self.products]


def main():
    disc = Discount(products, 0.5)
    # print disc.get_total_price()
    print disc.get_discount_rules(0.45, 30)

if __name__ == '__main__':
    main()

