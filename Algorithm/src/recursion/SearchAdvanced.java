package recursion;

/**
 * Created by homr on 2017. 4. 16..
 */
public class SearchAdvanced {
    public static void main(String[] args){
        int[] arr = {1,2,3,4,5,6,7,8,9};
        System.out.println(search(arr,0, arr.length-1, 5));
        System.out.println(search(arr, 0, arr.length-1, 10));
    }

    public static int search(int [] data, int begin, int end, int target){
        if(begin>end)
            return -1;
        else{
            int middle =  (begin+end)/2;

            if(data[middle]==target)
                return middle;

            int index = search(data, begin, middle-1, target);

            if(index != -1)
                return index;
            else
                return search(data, middle+1, end, target);
        }
    }

}
