const Hashtag = () => {
    return (<div>
        <div className="p-8 bg-white shadow-2xl h-[100%]  rounded-2xl">
            <div className="w-[300px]">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Trends for you
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Only on Sati Trending
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl className="w-full">
                        <div className="bg-gray-50 py-5 px-5 hover:bg-gray-200 ">
                            <dt className="text-sm font-medium text-gray-500">
                                #ก้าวไกลทั้งแผ่นดิน
                            </dt>
                        </div>
                        <div className=" bg-gray-50 py-5 px-5 hover:bg-gray-200 ">
                            <dt className="text-sm font-medium text-gray-500">
                                #ปราศัยใหญ่เพื่อไทย
                            </dt>

                        </div>
                        <div className="bg-gray-50 py-5 px-5 hover:bg-gray-200 ">
                            <dt className="text-sm font-medium text-gray-500">
                                #วอลเลย์บอลหญิง
                            </dt>
                        </div>
                        <div className="bg-gray-50 py-5 px-5 hover:bg-gray-200 ">
                            <dt className="text-sm font-medium text-gray-500">
                                #BABYMONSTER
                            </dt>

                        </div>
                        <div className="bg-gray-50 px-4 py-5 hover:bg-gray-200 ">
                            <dt className="text-sm font-medium text-gray-500">
                                #Sati
                            </dt>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>)
}

export default Hashtag