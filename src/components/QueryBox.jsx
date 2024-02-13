function QueryBox(props) {
    return (
        <form className="w-1/2" onSubmit={props.handleSubmit}>
        <div className="w-auto mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="query" className="sr-only">
              Escriba su petición
            </label>
            <textarea
              id="query"
              rows="4"
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
              placeholder="Escriba su petición"
              required
              value={props.query}
              onChange={(e) => props.setQuery(e.target.value)}></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Generar SQL
            </button>
          </div>
        </div>
      </form>
    )
}

export default QueryBox;