//usernameを格納する配列

const userList = []

export default (io, socket) => {
  // 入室メッセージをクライアントに送信
  socket.on("enterEvent", (newUser, callback) => {
    if (typeof callback !== "function") {
      console.error("Callback is not a function")
      return
    }

    if (!userList.some((u) => u.name === newUser.name)) {
      userList.push(newUser)
      io.sockets.emit("updateUserList", userList)
      // 入室メッセージを全クライアントにブロードキャスト
      io.sockets.emit("enterEvent", { newUser })

      callback({ success: true }) // ユーザーの追加が成功
    } else {
      callback({ success: false, message: "ユーザー名が既に存在しています。" }) // ユーザー名が重複している
    }
  })

  // 退室メッセージをクライアントに送信する
  socket.on("exitEvent", (data) => {
    const { user } = data

    // ユーザーがリストに存在する場合のみ削除
    const index = userList.findIndex((u) => u.name === user.name)
    if (index !== -1) {
      userList.splice(index, 1) // 指定したインデックスの要素を削除
      io.sockets.emit("updateUserList", userList)
    }

    socket.broadcast.emit("exitEvent", { user }) // 全クライアントに退室メッセージをブロードキャスト
  })

  // 投稿メッセージを送信する
  socket.on("publishEvent", (data) => {
    io.sockets.emit("publishEvent", data)
  })
}
