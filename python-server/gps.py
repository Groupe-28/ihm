def decimal_degrees_to_ddm(decimal_degrees, is_longitude=False):
    # Get the whole number part and the fractional part
    whole = int(decimal_degrees)
    fraction = abs(decimal_degrees - whole)

    # Convert the fractional part to minutes
    minutes = fraction * 60

    # Construct the DDM string
    direction = ""
    if is_longitude:
        if whole < 0:
            direction = "W"
        else:
            direction = "E"
        return f"{abs(whole):03}{int(minutes):02}{direction}"
    else:
        if whole < 0:
            direction = "S"
        else:
            direction = "N"
        return f"{abs(whole):02}{int(minutes):02}{direction}"


latitude = 2.357772739990423
longitude = 48.83755922181911


ddm_latitude = decimal_degrees_to_ddm(latitude)
ddm_longitude = decimal_degrees_to_ddm(longitude, True)

print(f"{ddm_latitude} {ddm_longitude}")
