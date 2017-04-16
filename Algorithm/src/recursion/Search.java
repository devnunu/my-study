package recursion;

/**
 * Created by homr on 2017. 4. 16..
 */
public class Search {

    public static void main(String[] args){
        int[] arr = {1,2,3,4,5,6,7,8,9};
        System.out.println(search(arr,0, arr.length-1, 5));
        System.out.println(search(arr, 0, arr.length-1, 10));
    }

    public static int search(int [] data, int begin, int end, int target){
        if(begin>end)
            return -1;
        else if(target == data[begin])
            return begin;
        else
            return search(data, begin+1, end, target);
    }

}
