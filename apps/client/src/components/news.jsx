const NewsComponent = () => {
    return (<div>
        <div className="p-8 bg-white shadow-2xl rounded-2xl">
            <div className=" max-w-2xl">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        What's news?
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        See what's news about today!
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl className="w-[200px]">
                        <div className="bg-gray-50 ">
                            <dt className="text-sm font-medium text-gray-500 py-5 text-clip hover:bg-gray-200 ">
                                กกต.เตือนเลือกตั้งพรุ่งนี้ ห้ามใส่เสื้อที่มีหมายเลขสอดคล้องผู้สมัคร
                            </dt>
                        </div>
                        <div className="bg-white ">
                            <dt className="text-sm font-medium text-gray-500 py-5 text-clip hover:bg-gray-200 ">
                                “2 แคนดิเดตนายกฯ” นำทัพใหญ่ “เพื่อไทย” หาเสียงวันสุดท้าย พร้อมสู้เอาประชาธิปไตยให้ ปชช.
                            </dt>
                        </div>
                        <div className="bg-gray-50 ">
                            <dt className="text-sm font-medium text-gray-500 py-5 text-clip hover:bg-gray-200 ">
                                รวมเลขเด็ดงวดนี้ 16/5/66 ปฏิทินจีน แม่น้ำหนึ่ง เลขดังทุกสำนัก
                            </dt>
                        </div>
                        <div className="bg-gray-50 ">
                            <dt className="text-sm font-medium text-gray-500 py-5 text-clip hover:bg-gray-200 ">
                                สื่อสารเลือกตั้ง66 อย่างเท่าทันและเท่าเทียม ด้วย “Big Sign ภาษามือคำศัพท์ทางการเมือง” เพื่อคนหูหนวก
                            </dt>
                        </div>
                        <div className="bg-gray-50 ">
                            <dt className="text-sm font-medium text-gray-500 py-5 text-clip hover:bg-gray-200 ">
                                เห็นลายปริศนาบนมือลูก อวด "ครู" วาดให้ แม่ตงิดใจแจ้งตำรวจ จับแก๊งลักเด็กในคราบครู
                            </dt>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>)
}

export default NewsComponent;