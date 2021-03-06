/**
 * Created by Felix on 3-5-2017.
 */

// Sample recipes database
// Source: https://en.wikibooks.org/wiki/Cookbook
var recipes = [
    {
        name: 'Lasagne',
        category: 'Pasta',
        procedure: 'Steps for making lasagne',
        ingredients: [
            'Dough',
            'Cheese',
            'Meat',
            'Creme freche',
            'Red sauce'
        ]
    },
    {
        name: 'Calzone',
        category: 'Pizza',
        procedure: 'Steps to make calzone (pizza)',
        ingredients: [
            'Pizza dough',
            'Cheese'
        ]
    },
    {
        name: 'Tuna Salad',
        category: 'Salad',
        procedure: [
            'Mix ingredients in a bowl',
            'Chill before serving'
        ],
        ingredients: [
            'Tuna',
            'Lettuce'
        ]
    }
];

module.exports = recipes;
