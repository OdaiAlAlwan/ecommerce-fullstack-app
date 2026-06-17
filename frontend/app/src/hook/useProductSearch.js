import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_Product } from '../rtk/slices/Product-slice'

const useProductSearch = () => {
    // 1. الاتصال بـ Redux
    const dispatch = useDispatch();
    const { data, loader } = useSelector((state) => state.products);
    
    // 2. تعريف حالة البحث
    const [searchParams, setSearchParams] = useState({
      keyword: '',
      price: { gte: '', lte: '' },
      sort: '',
      // ... معلمات أخرى
    });
  
    // 3. دالة البحث الرئيسية
    const handleSearch = () => {
      // بناء كائن المعلمات
      const params = {
        ...searchParams,
        'price[gte]': searchParams.price.gte,
        'price[lte]': searchParams.price.lte
      };
      
      // إرسال طلب البحث
      dispatch(Get_Product(params));
    };
  
    // 4. تشغيل البحث عند تغيير الفرز
    useEffect(() => {
      handleSearch();
    }, [searchParams.sort]);
  
    // 5. إرجاع القيم للاستخدام
    return {
      searchParams,
      setSearchParams,
      handleSearch,
      products: data,
      loading: loader
    };
  };


  export default useProductSearch;