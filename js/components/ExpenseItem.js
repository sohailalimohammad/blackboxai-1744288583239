const ExpenseItem = ({ expense, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            onDelete(expense.id);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getCategoryIcon = (category) => {
        const icons = {
            food: 'fas fa-utensils',
            transportation: 'fas fa-car',
            utilities: 'fas fa-home',
            entertainment: 'fas fa-film',
            other: 'fas fa-shopping-bag'
        };
        return icons[category] || icons.other;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 transform transition duration-200 hover:scale-[1.02]">
            <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${expense.category === 'food' ? 'bg-green-100' : 
                                                      expense.category === 'transportation' ? 'bg-blue-100' :
                                                      expense.category === 'utilities' ? 'bg-yellow-100' :
                                                      expense.category === 'entertainment' ? 'bg-purple-100' : 
                                                      'bg-gray-100'}`}>
                        <i className={`${getCategoryIcon(expense.category)} text-lg ${
                            expense.category === 'food' ? 'text-green-500' :
                            expense.category === 'transportation' ? 'text-blue-500' :
                            expense.category === 'utilities' ? 'text-yellow-500' :
                            expense.category === 'entertainment' ? 'text-purple-500' :
                            'text-gray-500'
                        }`}></i>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">{expense.description}</h3>
                        <p className="text-sm text-gray-500 capitalize">{expense.category}</p>
                        <p className="text-xs text-gray-400">{formatDate(expense.date)}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-gray-700">
                        ${expense.amount.toFixed(2)}
                    </span>
                    <button 
                        onClick={handleDelete}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        title="Delete expense"
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
