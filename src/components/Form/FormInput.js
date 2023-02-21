function FormInput({ label, placeholder, type, Icon, id, value }) {
  return (
    <div class="mb-4 mt-2">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        {label}
      </label>
      <div className="flex items-center shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight  justify-between">
        <input
          class="focus:outline-none focus:shadow-outline flex-grow"
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
        />
        <Icon className="h-5 w-5 ml-2 text-gray-500" />
      </div>
    </div>
  );
}

export default FormInput;
