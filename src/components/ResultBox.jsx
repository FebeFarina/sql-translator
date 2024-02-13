function ResultBox(props) {
    return (
        <div className="w-1/2 h-1/2 px-4 py-2 bg-white rounded-lg dark:bg-gray-800">
        <textarea
          className={"w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none" + (props.isLoading ? " animate-pulse" : "")}
          readOnly
          placeholder="El resultado de la petición se mostrará aquí"
          value={props.result}></textarea>
      </div>
    )
}

export default ResultBox;