const startChat = async (type: string) => {
  if (!listing) return;
  try {
    const res = await fetch("/api/chat/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        listingId: listing.id,
        title: listing.title,
      }),
    });

    if (res.status === 401) {
      alert("로그인이 필요한 서비스입니다.");
      router.push(`/login?callbackUrl=/listing/${listing.id}`);
      return;
    }

    const data = await res.json();
    if (data.thread?.id) {
      router.push(`/chat/${data.thread.id}?role=user`);
    }
  } catch (e) {
    console.error(e);
    alert("채팅 연결 중 오류가 발생했습니다.");
  }
};