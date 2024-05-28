import { auth, db } from "@/firebase/config";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const useUser = () => {
  const [user, loading, error]: any = useAuthState(auth);
  const [loadingUser, setLoadinguser] = useState(true);
  const [userData, setUserData] = useState<any>();
  const getUserDoc = useCallback(async ()=> {
    const snapShot = await getDocs(collection(db, `${user?.email}`));
    let arr: any = [];
    snapShot.forEach((doc: any) => {
      // console.log(doc.id);
      arr.push({ id: doc.id, ...doc.data() });
    });
    setUserData(arr[0]);
    setLoadinguser(false);
  }, [user])
  useEffect(() => {
    getUserDoc();
  }, [user, getUserDoc]);

  return { userData, loading: loading || loadingUser };
};
