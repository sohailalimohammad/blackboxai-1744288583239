const App = () => {
    const [expenses, setExpenses] = React.useState(() => {
        const savedExpenses = localStorage.getItem('expenses');
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });
    const [showForm, setShowForm] = React.useState(false);

    // Save expenses to localStorage whenever they change
    React.useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const handleAddExpense = (newExpense) => {
        setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
        setShowForm(false);
    };

    const handleDeleteExpense = (expenseId) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== expenseId));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                            <i className="fas fa-wallet text-blue-500 mr-2"></i>
                            Expense Tracker
                        </h1>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <i className={`fas fa-${showForm ? 'times' : 'plus'} mr-2`}></i>
                            {showForm ? 'Close Form' : 'Add Expense'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Message - Show only when no expenses and form is hidden */}
                {expenses.length === 0 && !showForm && (
                    <div className="text-center py-12">
                        <div className="rounded-full bg-blue-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                            <i className="fas fa-coins text-2xl text-blue-500"></i>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Expense Tracker</h2>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">
                            Start tracking your expenses today. Add your first expense to get started!
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Add Your First Expense
                        </button>
                    </div>
                )}

                {/* Expense Form */}
                {showForm && (
                    <div className="mb-8">
                        <ExpenseForm onAddExpense={handleAddExpense} />
                    </div>
                )}

                {/* Expense List */}
                {expenses.length > 0 && (
                    <ExpenseList 
                        expenses={expenses} 
                        onDeleteExpense={handleDeleteExpense}
                    />
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-auto py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} Expense Tracker. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};
