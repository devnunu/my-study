package recursion;

/**
 * Created by homr on 2017. 4. 16..
 */
public class BinarySearch {
    public static void main(String[] args){
        String[] arr = {"orange","apple","grape"};
        System.out.println(binarySearch(arr,"apple",0,arr.length-1));
        System.out.println(binarySearch(arr,"mango",0,arr.length-1));
    }
    public static int binarySearch(String[] items, String target, int begin, int end){
        if(begin>end)
            return -1;
        else{
            int middle = (begin+end)/2;
            int compResult = target.compareTo(items[middle]);
            if(compResult == 0)
                return middle;
            else if(compResult<0)
                return binarySearch(items, target, begin, middle-1);
            else
                return  binarySearch(items, target, middle+1, end);
        }
    }

}
