package example;

/**
 * Created by homr on 2017. 5. 22..
 */
public class SystemChange {
    public static void main(String[] args){
        int num = 10;
        String hex = Integer.toHexString(num);
        String octal = Integer.toOctalString(num);
        String binary = Integer.toBinaryString(num);

        System.out.println("16진수는 " + hex);
        System.out.println("8진수는 " + octal);
        System.out.println("2진수는 " + binary);

        System.out.println("16진수 String 역변환 " + Integer.valueOf(hex,16));
        System.out.println("8진수 String 역변환 " + Integer.valueOf(octal,8));
        System.out.println("2진수 String 역변환 " + Integer.valueOf(binary,2));
    }
}
