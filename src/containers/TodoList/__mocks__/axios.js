const mockUndoList = {
    data: [{
        status: 'div',
        value: '黄思沁'
    }],
    success: true
}

export default {
    get(url) {
        if (url === '/undolist.json') {
            return new Promise((resolve, reject) => {
                if (this.success) {
                    resolve(mockUndoList)
                } else {
                    reject(new Error())
                }
            })
        }
    }
}