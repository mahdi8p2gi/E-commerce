import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

function Profile() {
  const { user, navigate } = useAppContext();

  useEffect(() => {
    // اگر کاربر لاگین نکرده بود، بفرستش به صفحه لاگین یا خانه
    if (!user) {
      navigate("/");
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-xl p-6 mx-auto mt-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">پروفایل کاربر</h2>
      <div className="space-y-3">
        <p><span className="font-medium">نام کاربری:</span> {user.username}</p>
        <p><span className="font-medium">ایمیل:</span> {user.email}</p>
        <p><span className="font-medium">شناسه کاربر:</span> {user.id}</p>
      </div>
    </div>
  );
}

export default Profile;
