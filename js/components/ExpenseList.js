const ExpenseList = ({ expenses, onDeleteExpense }) => {
    const calculateTotal = () => {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    };

    const groupExpensesByCategory = () => {
        return expenses.reduce((groups, expense) => {
            const category = expense.category;
            if (!groups[category]) {
                groups[category] = 0;
            }
            groups[category] += expense.amount;
            return groups;
        }, {});
    };

    const categoryTotals = groupExpensesByCategory();

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Summary Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-blue-800">Total Expenses</h3>
                        <p className="text-2xl font-bold text-blue-600">${calculateTotal().toFixed(2)}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-green-800">Categories</h3>
                        <p className="text-sm text-green-600">{Object.keys(categoryTotals).length} active categories</p>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Breakdown</h3>
                    <div className="space-y-2">
                        {Object.entries(categoryTotals).map(([category, amount]) => (
                            <div key={category} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                <span className="capitalize text-gray-700">{category}</span>
                                <span className="font-semibold text-gray-800">${amount.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Expenses List */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Expenses</h2>
                {expenses.length === 0 ? (
                    <div className="text-center py-8 bg-white rounded-xl shadow-md">
                        <i className="fas fa-receipt text-4xl text-gray-300 mb-3"></i>
                        <p className="text-gray-500">No expenses recorded yet.</p>
                        <p className="text-sm text-gray-400">Add your first expense to get started!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {expenses.map(expense => (
                            <ExpenseItem 
                                key={expense.id} 
                                expense={expense} 
                                onDelete={onDeleteExpense}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
