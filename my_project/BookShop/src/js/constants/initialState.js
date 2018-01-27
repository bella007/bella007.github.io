// Это изначальные данные для store нашего приложения, тут мы должы будем 
// указывать все данные которые мы будем отрисовывать, состояние компонентов здесь
// хранить не имеет смысла, а вот данные которые мы можем как-то менять, если в будущем 
// для получения этих данных мы будем использовать базу данных - да, тогда мы можем использовать store.

// Но на самом деле это лишь относительное соглашение, и javascript нас ни в чем не ограничивает. 

export default ({

	sideMenu : 0,

	books : [],
	
	authorized: 'Anonim', 
	

    users: [
    	{name: 'Michael', 
		password: '123',
		email: 'Michael@com', 
		cart: [],
		wishList: [],
		orderHistory: [],
		viewHistory: []
	},
		{name: 'Bella',
		password: '123',
		email: 'Bella@com',
		cart: [],
		wishList: [],
		orderHistory: [],
		viewHistory: []
	},
		{name: 'Sasha',
		password: '123',
		email: 'Sasha@com',
		cart: [],
		wishList: [],
		orderHistory: [],
		viewHistory: []
	},
	{name: 'Anonim',
	password: '',
	email: '',
	cart: [],
	wishList: [],
	orderHistory: [],
	viewHistory: []
}
	],
    categories: ['.NET', 'Assembler', 'C/C++', 'C++Builder', 'Delphi', 'Java', 'Pascal', 
	'Python', 'React', 'Redux', 'Visual C++', 'Windows', 'New!', 'temporary', 'search'],
	userMenu: ['Cart', 'Wish list', 'Order history', 'View history'],
	activeCategory: 'React',

	
	watchedBooks:[
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'},
    {img:'https://i.pinimg.com/736x/6e/d6/1e/6ed61ee28ac6c5d0a547a04bc4a22b37--senior-pictures-balloons-senior-pics.jpg'}
]	   
});