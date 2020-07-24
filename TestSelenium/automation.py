from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import unittest
import time
import os

class Toc(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Remote(desired_capabilities={
            "browserName": "firefox",
            "platform": "LINUX",
        })
        self.driver.implicitly_wait(60)
        self.driver.get('http://localhost:4200/')

    def test_upload_and_delete_image(self):
        self.driver.find_element(*(By.ID,'upload')).click()
        self.driver.implicitly_wait(2)
        self.driver.find_element(*(By.ID,'title')).send_keys('Titulo prueba selenium')
        self.driver.find_element(*(By.ID,'description')).send_keys('Descripcion prueba selenium')
        self.driver.find_element(*(By.ID,'img-input')).send_keys('/Users/veral/Downloads/test_logo.jpg')
        self.driver.find_element(*(By.ID,'btn-upload')).click()
        element = self.driver.find_element(By.XPATH, "//div[ contains(div/text(),' Titulo prueba selenium ')]")
        ban = True
        if not element:
            ban = False
        self.assertEqual(True,ban)
        time.sleep(4)
        self.driver.find_element(By.XPATH, "//div[ contains(div/text(),' Titulo prueba selenium ')]").click()
        self.driver.find_element(*(By.ID,'btn-delete')).click()
        time.sleep(4)
        ban2 = False
        try:
            element = self.driver.find_element(By.XPATH, "//div[ contains(div/text(),' Titulo prueba selenium ')]")
            print('Lo encontro. No ha sido eliminado')
            ban2 = False
        except NoSuchElementException:
            print('No lo encontro, ha sido eliminado')
            ban2 = True
        self.assertEqual(True,ban2)
        time.sleep(4)
    def test_upload_and_update(self):
        self.driver.find_element(*(By.ID,'upload')).click()
        self.driver.implicitly_wait(2)
        self.driver.find_element(*(By.ID,'title')).send_keys('Titulo prueba update selenium')
        self.driver.find_element(*(By.ID,'description')).send_keys('Descripcion prueba selenium')
        self.driver.find_element(*(By.ID,'img-input')).send_keys('/Users/veral/Downloads/test_logo.jpg')
        self.driver.find_element(*(By.ID,'btn-upload')).click()
        element = self.driver.find_element(By.XPATH, "//div[ contains(div/text(),' Titulo prueba update selenium ')]")
        ban = True
        if not element:
            ban = False
            print('No ha sido creado')
        else:
            print('Se creo')
        self.assertEqual(True,ban)
        time.sleep(4)
        self.driver.find_element(By.XPATH, "//div[ contains(div/text(),' Titulo prueba update selenium ')]").click()
        self.driver.find_element(*(By.ID,'title')).clear()
        self.driver.find_element(*(By.ID,'title')).send_keys('Nuevo titulo prueba update selenium')
        self.driver.find_element(*(By.ID,'description')).clear()
        self.driver.find_element(*(By.ID,'description')).send_keys('Nueva descripcion prueba selenium')
        self.driver.find_element(*(By.ID,'btn-update')).click()
        time.sleep(4)
        ban2 = False
        try:
            element = self.driver.find_element(By.XPATH, "//div[ contains(div/text(),' Nuevo titulo prueba update selenium ')]")
            print('Lo encontro. Ha sido actualizado')
            ban2 = True
        except NoSuchElementException:
            print('No lo encontro, No ha sido actualizado')
            ban2 = False
        self.assertEqual(True,ban2)
        time.sleep(4)
        self.driver.find_element(By.XPATH, "//div[ contains(div/text(),' Titulo prueba update selenium ')]").click()
        self.driver.find_element(*(By.ID,'btn-delete')).click()
        time.sleep(4)
        ban2 = False
        try:
            element = self.driver.find_element(By.XPATH, "//div[ contains(div/text(),' Titulo prueba update selenium ')]")
            print('Lo encontro. No ha sido eliminado')
            ban2 = False
        except NoSuchElementException:
            print('No lo encontro, ha sido eliminado')
            ban2 = True
        self.assertEqual(True,ban2)
        time.sleep(4)
        
    def tearDown(self):
        self.driver.close() 
if __name__ == "__main__":
    unittest.main()