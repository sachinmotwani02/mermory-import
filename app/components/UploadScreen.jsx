import Image from "next/image";

export default function UploadScreen({
  uploadedFile,
  pastedLink,
  handleFileUpload,
  handleLinkPaste,
  canProceedFromUpload,
  nextStep
}) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Main heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Create a deck with your lecture notes
        </h1>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          or study material
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Bring your notes, files or any study material
        </p>
      </div>

      {/* Drag and drop area */}
      <div className="mb-8">
        <div
          className="border-2 border-dashed border-blue-300 dark:border-gray-600 rounded-3xl p-16 text-center bg-gray-50 dark:bg-gray-800/30"
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
          }}
          onDragLeave={(e) => {
            e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
              handleFileUpload(files[0]);
            }
          }}
        >
          <div className="mb-6">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={(e) => {
                if (e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-medium text-lg transition-colors duration-200 cursor-pointer"
            >
              Click to upload
            </label>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Drag your files here, or{" "}
            <label
              htmlFor="file-upload"
              className="text-blue-400 cursor-pointer hover:underline"
            >
              browse
            </label>{" "}
            from your computer
          </p>

          {uploadedFile && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-blue-600 dark:text-blue-400">
                ✓ {uploadedFile.name} uploaded
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Text area for links */}
      <div className="mb-8">
        <textarea
          placeholder="paste any link here"
          value={pastedLink}
          onChange={(e) => handleLinkPaste(e.target.value)}
          className="w-full p-6 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none h-20 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Continue button */}
      <div className="text-center">
        <button
          onClick={nextStep}
          disabled={!canProceedFromUpload}
          className={`px-8 py-3 rounded-full font-medium text-lg transition-colors duration-200 ${
            canProceedFromUpload
              ? 'bg-blue-400 hover:bg-blue-500 text-white cursor-pointer'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}